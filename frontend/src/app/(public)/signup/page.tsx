import Link from "next/link";
import { User, Briefcase } from "lucide-react";
import styles from "./Signup.module.css";

export default function SignupPage() {
  return (
    <main className={styles.container}>
      <Link href="/signup/user" className={`${styles.panel} ${styles.userPanel}`}>
        <div className={styles.content}>
          <User className={styles.icon} size={64} strokeWidth={1.5} />
          <h2 className={styles.title}>Join as a User</h2>
          <p className={styles.description}>
            Find and hire professionals for any task.
          </p>
        </div>
      </Link>
      <Link href="/signup/worker" className={`${styles.panel} ${styles.workerPanel}`}>
        <div className={styles.content}>
          <Briefcase className={styles.icon} size={64} strokeWidth={1.5} />
          <h2 className={styles.title}>Join as a Worker</h2>
          <p className={styles.description}>
            Offer your skills and find your next project.
          </p>
        </div>
      </Link>
    </main>
  );
}