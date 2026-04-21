const express = require("express");
const cors = require("cors");
const initSqlJs = require("sql.js");

const app = express();
const PORT = process.env.PORT || 4000;
let db;

app.use(cors());
app.use(express.json());

function readRows(result) {
  if (!result.length) {
    return [];
  }

  const [{ columns, values }] = result;
  return values.map((valueSet) =>
    columns.reduce((row, column, index) => {
      row[column] = valueSet[index];
      return row;
    }, {}),
  );
}

function run(sql, params = []) {
  const statement = db.prepare(sql);
  statement.bind(params);
  statement.step();
  statement.free();

  const lastIdRows = readRows(db.exec("SELECT last_insert_rowid() AS lastID"));
  return { lastID: lastIdRows[0]?.lastID };
}

function get(sql, params = []) {
  const rows = all(sql, params);
  return rows[0];
}

function all(sql, params = []) {
  const statement = db.prepare(sql);
  statement.bind(params);

  const rows = [];
  while (statement.step()) {
    rows.push(statement.getAsObject());
  }

  statement.free();
  return rows;
}

async function initialiseDatabase() {
  const SQL = await initSqlJs();
  db = new SQL.Database();
}

async function seedDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS patient_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      nhs_number TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      gender TEXT NOT NULL DEFAULT '',
      marital_status TEXT NOT NULL DEFAULT '',
      allergies TEXT NOT NULL DEFAULT '',
      emergency_contact TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hospital TEXT NOT NULL,
      patient_name TEXT NOT NULL,
      nhs_number TEXT NOT NULL,
      phone TEXT,
      department TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT NOT NULL,
      reschedule_request TEXT NOT NULL DEFAULT '',
      staff_note TEXT NOT NULL DEFAULT ''
    )
  `);

  const userCount = await get("SELECT COUNT(*) AS count FROM users");
  if (userCount.count === 0) {
    await run(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?), (?, ?, ?)",
      ["patient1", "patient1", "patient", "staff1", "staff1", "staff"],
    );
  }

  const profileCount = await get(
    "SELECT COUNT(*) AS count FROM patient_profile",
  );
  if (profileCount.count === 0) {
    await run(
      "INSERT INTO patient_profile (full_name, nhs_number, date_of_birth, gender, marital_status, allergies, emergency_contact, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        "Chris Olarte",
        "485 777 3456",
        "12 Jan 2003",
        "Male",
        "Single",
        "Peanuts",
        "Alex Olarte - 07999 123456",
        "07123 456789",
      ],
    );
  }

  const appointmentCount = await get(
    "SELECT COUNT(*) AS count FROM appointments",
  );
  if (appointmentCount.count === 0) {
    await run(
      `INSERT INTO appointments
       (hospital, patient_name, nhs_number, phone, department, date, time, reason, status)
       VALUES
       (?, ?, ?, ?, ?, ?, ?, ?, ?),
       (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "Kingston Hospital",
        "Chris Olarte",
        "485 777 3456",
        "07123 456789",
        "General Medicine",
        "Mon 22 Apr",
        "10:30",
        "Check-up",
        "Confirmed",
        "Frimley Park Hospital",
        "Chris Olarte",
        "485 777 3456",
        "07123 456789",
        "Cardiology",
        "Thu 25 Apr",
        "15:00",
        "Follow-up",
        "Waiting for hospital",
      ],
    );
  }
}

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/login", async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await get(
      "SELECT username, role FROM users WHERE username = ? AND password = ?",
      [username, password],
    );

    if (!user) {
      response.status(401).json({ message: "Invalid login details." });
      return;
    }

    response.json(user);
  } catch (error) {
    response.status(500).json({ message: "Login failed." });
  }
});

app.get("/api/profile", async (_request, response) => {
  try {
    const profile = await get(
      "SELECT id, full_name AS fullName, nhs_number AS nhsNumber, date_of_birth AS dateOfBirth, gender, marital_status AS maritalStatus, allergies, emergency_contact AS emergencyContact, phone FROM patient_profile LIMIT 1",
    );
    response.json(profile);
  } catch (error) {
    response.status(500).json({ message: "Profile could not be loaded." });
  }
});

app.put("/api/profile", async (request, response) => {
  try {
    const { phone, gender, maritalStatus, allergies, emergencyContact } =
      request.body;
    await run(
      "UPDATE patient_profile SET phone = ?, gender = ?, marital_status = ?, allergies = ?, emergency_contact = ? WHERE id = 1",
      [phone, gender, maritalStatus, allergies, emergencyContact],
    );
    const profile = await get(
      "SELECT id, full_name AS fullName, nhs_number AS nhsNumber, date_of_birth AS dateOfBirth, gender, marital_status AS maritalStatus, allergies, emergency_contact AS emergencyContact, phone FROM patient_profile WHERE id = 1",
    );
    response.json(profile);
  } catch (error) {
    response.status(500).json({ message: "Profile could not be updated." });
  }
});

app.get("/api/appointments", async (_request, response) => {
  try {
    const appointments = await all(
      `SELECT
         id,
         hospital,
         patient_name AS patientName,
         nhs_number AS nhsNumber,
         phone,
         department,
         date,
         time,
         reason,
         status,
         reschedule_request AS rescheduleRequest,
         staff_note AS staffNote
       FROM appointments
       ORDER BY id DESC`,
    );
    response.json(appointments);
  } catch (error) {
    response.status(500).json({ message: "Appointments could not be loaded." });
  }
});

app.post("/api/appointments", async (request, response) => {
  try {
    const { hospital, department, date, time, reason } = request.body;
    const profile = await get("SELECT * FROM patient_profile WHERE id = 1");

    const result = await run(
      `INSERT INTO appointments
       (hospital, patient_name, nhs_number, phone, department, date, time, reason, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hospital,
        profile.full_name,
        profile.nhs_number,
        profile.phone,
        department,
        date,
        time,
        reason,
        "Waiting for hospital",
      ],
    );

    const appointment = await get(
      `SELECT
         id,
         hospital,
         patient_name AS patientName,
         nhs_number AS nhsNumber,
         phone,
         department,
         date,
         time,
         reason,
         status,
         reschedule_request AS rescheduleRequest,
         staff_note AS staffNote
       FROM appointments
       WHERE id = ?`,
      [result.lastID],
    );

    response.status(201).json(appointment);
  } catch (error) {
    response.status(500).json({ message: "Appointment could not be created." });
  }
});

app.patch("/api/appointments/:id/status", async (request, response) => {
  try {
    const { status, staffNote = "" } = request.body;
    const currentAppointment = await get("SELECT * FROM appointments WHERE id = ?", [
      request.params.id,
    ]);

    if (status === "Confirmed" && currentAppointment.reschedule_request) {
      const [date, time] = currentAppointment.reschedule_request.split(", ");
      await run(
        "UPDATE appointments SET date = ?, time = ?, status = ?, staff_note = ?, reschedule_request = '' WHERE id = ?",
        [date, time, status, staffNote, request.params.id],
      );
    } else {
      await run(
        "UPDATE appointments SET status = ?, staff_note = ?, reschedule_request = '' WHERE id = ?",
        [status, staffNote, request.params.id],
      );
    }

    const appointment = await get(
      `SELECT
         id,
         hospital,
         patient_name AS patientName,
         nhs_number AS nhsNumber,
         phone,
         department,
         date,
         time,
         reason,
         status,
         reschedule_request AS rescheduleRequest,
         staff_note AS staffNote
       FROM appointments
       WHERE id = ?`,
      [request.params.id],
    );
    response.json(appointment);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Appointment status could not be updated." });
  }
});

app.patch("/api/appointments/:id/reschedule", async (request, response) => {
  try {
    const { rescheduleRequest } = request.body;
    await run(
      "UPDATE appointments SET reschedule_request = ?, status = ?, staff_note = '' WHERE id = ?",
      [rescheduleRequest, "Reschedule requested", request.params.id],
    );

    const appointment = await get(
      `SELECT
         id,
         hospital,
         patient_name AS patientName,
         nhs_number AS nhsNumber,
         phone,
         department,
         date,
         time,
         reason,
         status,
         reschedule_request AS rescheduleRequest,
         staff_note AS staffNote
       FROM appointments
       WHERE id = ?`,
      [request.params.id],
    );
    response.json(appointment);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Appointment reschedule could not be requested." });
  }
});

app.delete("/api/appointments/:id", async (request, response) => {
  try {
    await run("DELETE FROM appointments WHERE id = ?", [request.params.id]);
    response.json({ success: true });
  } catch (error) {
    response.status(500).json({ message: "Appointment could not be deleted." });
  }
});

initialiseDatabase()
  .then(seedDatabase)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`HealthLink API running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database startup failed.", error);
    process.exit(1);
  });
