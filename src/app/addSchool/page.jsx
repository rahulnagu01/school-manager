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
    
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("School added successfully!");
        reset();
      } else {
        setMessage("Error adding school");
      }
    } catch (err) {
      setMessage("Network error");
    }
    setUploading(false);
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
            <input {...register("contact", { required: true, minLength: 10, maxLength: 15 })} placeholder="Enter contact number" />
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

        {/* Styled Buttons */}
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


// "use client";
// import { useForm } from "react-hook-form";
// import { useState, useRef } from "react";
// import styles from "./AddSchool.module.css";

// export default function AddSchool() {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const inputFileRef = useRef(null);

//   const onSubmit = async (data) => {
//     setUploading(true);
//     setMessage("");

//     const formData = new FormData();
//     for (const key in data) {
//       if (key === "image") {
//         formData.append("image", data.image[0]);
//       } else {
//         formData.append(key, data[key]);
//       }
//     }

//     try {
//       const res = await fetch("/api/addSchool", {
//         method: "POST",
//         body: formData,
//       });
//       if (res.ok) {
//         setMessage("✅ School added successfully!");
//         reset();
//       } else {
//         setMessage("❌ Error adding school");
//       }
//     } catch (err) {
//       setMessage("⚠️ Network error");
//     }
//     setUploading(false);
//   };

//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//         <h2>Add School</h2>
//         <p className={styles.subtitle}>Fill in the details below to register a new school.</p>

//         {/* School Name */}
//         <label>
//           School Name
//           <input
//             {...register("name", { required: true })}
//             placeholder="e.g. karnataka Public School"
//           />
//           {errors.name && <span>Name is required</span>}
//         </label>

//         {/* Address */}
//         <label>
//           Address
//           <input
//             {...register("address", { required: true })}
//             placeholder="123, Main Street"
//           />
//           {errors.address && <span>Address is required</span>}
//         </label>

//         <div className="grid grid-cols-2 gap-6">
//         {/* City */}
//         <div>
//             <label className="block text-gray-700">City</label>
//             <input
//             type="text"
//             placeholder="e.g Bengaluru"
//             className="w-full border rounded-lg px-3 py-2"
//             />
//         </div>

//         {/* State */}
//         <div>
//             <label className="block text-gray-700">State</label>
//             <input
//             type="text"
//             placeholder="e.g Karnataka"
//             className="w-full border rounded-lg px-3 py-2"
//             />
//         </div>

//         {/* Contact */}
//         <div className="mt-4">
//             <label className="block text-gray-700">Contact Number</label>
//             <input
//             type="text"
//             placeholder="e.g. 96XXXXXXXX"
//             className="w-full border rounded-lg px-3 py-2"
//             />
//         </div>

//         {/* Email */}
//         <div className="mt-4">
//             <label className="block text-gray-700">Email ID</label>
//             <input
//             type="email"
//             placeholder="e.g. school@gmail.com"
//             className="w-full border rounded-lg px-3 py-2"
//             />
//         </div>
//         </div>

        

//         {/* File Upload */}
//         <label>
//           Upload School Image
//           <input type="file" accept="image/*" {...register("image", { required: true })} />
//           {errors.image && <span>Image is required</span>}
//         </label>

//         {/* Buttons */}
//         <div className={styles.actionRow}>
//           <button
//             type="button"
//             onClick={() => (window.location.href = "/showSchools")}
//             className={styles.cancelBtn}
//           >
//             Cancel
//           </button>
//           <button type="submit" disabled={uploading} className={styles.submitBtn}>
//             {uploading ? "Uploading..." : "Submit"}
//           </button>
//         </div>

//         {message && <div className={styles.message}>{message}</div>}
//       </form>
//     </div>
//   );
// }
