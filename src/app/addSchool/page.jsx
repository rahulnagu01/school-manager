'use client';
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from './AddSchool.module.css';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    setUploading(true);
    setMessage('');

    try {
      // Convert file to Base64
      const file = data.image[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        // Send all form data + base64 image to backend
        const res = await fetch("/api/schools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            address: data.address,
            city: data.city,
            state: data.state,
            contact: data.contact,
            email_id: data.email_id,
            image: reader.result, // base64 string
          }),
        });

        if (res.ok) {
          setMessage("School added successfully!");
          reset();
        } else {
          setMessage("Error adding school");
        }
        setUploading(false);
      };
    } catch (err) {
      console.error(err);
      setMessage("Network or upload error");
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Add New School</h2>
        <p>Fill in the details below to add a new school to the system.</p>

        <label>School Name
          <input {...register("name", { required: true })} placeholder="Enter school name" />
          {errors.name && <span>Name is required</span>}
        </label>

        <label>Address
          <input {...register("address", { required: true })} placeholder="Enter school address" />
          {errors.address && <span>Address is required</span>}
        </label>

        <div className={styles.row}>
          <label>City
            <input {...register("city", { required: true })} placeholder="Enter city" />
            {errors.city && <span>City is required</span>}
          </label>
          <label>State
            <input {...register("state", { required: true })} placeholder="Enter state" />
            {errors.state && <span>State is required</span>}
          </label>
        </div>

        <div className={styles.row}>
          <label>Contact Number
            <input {...register("contact", { required: true, minLength: 10, maxLength: 10 })} placeholder="Enter contact number" />
            {errors.contact && <span>Valid contact number required</span>}
          </label>
          <label>Email ID
            <input {...register("email_id", { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/i })} placeholder="Enter email ID" />
            {errors.email_id && <span>Email is required</span>}
          </label>
        </div>

        <label>School Image
          <input type="file" accept="image/*" {...register("image", { required: true })} />
          {errors.image && <span>Image is required</span>}
        </label>

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => window.location.href = '/showSchools'}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>

        {message && <div className={styles.message}>{message}</div>}
      </form>
    </div>
  );
}

