import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import styles from "./styles/OverviewHeader.module.css";

export function OverviewHeader() {
  return (
    <div className={styles.header}>
      <div>
        <h1>Good morning, Alex</h1>
        <p>Here’s what’s happening across your projects.</p>
      </div>
      <Button>
        <FiPlus aria-hidden="true" />
        New project
      </Button>
    </div>
  );
}
