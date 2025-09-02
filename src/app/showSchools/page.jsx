'use client';
import { useEffect, useState } from "react";
import styles from './ShowSchools.module.css';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/schools')
      .then(res => res.json())
      .then(data => setSchools(data));
  }, []);

  const filtered = schools.filter(sch =>
    sch.name.toLowerCase().includes(query.toLowerCase()) ||
    sch.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.listContainer}>
      <div className={styles.headingRow}>
        <h2>Schools</h2>
        <input
          className={styles.search}
          type="text"
          placeholder="Search schools by name or city"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className={styles.grid}>
        {filtered.length === 0 && <p>No schools found.</p>}
        {filtered.map(school => (
          <div key={school.id} className={styles.card}>
            <img src={school.image} alt={school.name} className={styles.img} />
            <div className={styles.info}>
              <div className={styles.schoolName}>{school.name}</div>
              <div className={styles.address}>{school.address}, {school.city}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}