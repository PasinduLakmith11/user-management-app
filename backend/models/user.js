import db from '../config/database.js';

class User {
  static create(userData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (name, email, password, gender, hobby, skill_level, bio, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      
      db.query(query, [
        userData.name,
        userData.email,
        userData.password,
        userData.gender,
        userData.hobby,
        userData.skill_level,
        userData.bio
      ], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, name, email, gender, hobby, skill_level, bio, created_at FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, name, email, gender, hobby, skill_level, bio, created_at FROM users ORDER BY created_at DESC';
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

export default User;