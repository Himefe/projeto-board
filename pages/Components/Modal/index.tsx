import React from "react";
import { formatDateFromDatabase } from "../../../helper/formatDate";
import { api_tasks } from "../../../libs/api/tasks";
import styles from "./styles.module.css";

type Props = {
  closeModal: (e: React.SyntheticEvent<HTMLDivElement>) => void;
  task: {
    id: string;
    title: string;
    date: string;
  } | null;
  setTasks: (task: { id: string; title: string; date: string }[]) => void;
  setModalActive: (param: boolean) => void;
  tasks: { id: string; title: string; date: string }[];
};

const Modal = ({
  closeModal,
  task,
  setTasks,
  setModalActive,
  tasks,
}: Props) => {
  const [value, setValue] = React.useState<string | undefined>(task?.title);

  const handleSave = async (): Promise<void> => {
    const date = new Date();

    const dateLiteral: {
      [x: number]: string;
    } = {
      0: "Janeiro",
      1: "Fevereiro",
      2: "Março",
      3: "Abril",
      4: "Maio",
      5: "Junho",
      6: "Julho",
      7: "Agosto",
      8: "Setembro",
      9: "Outubro",
      10: "Novembro",
      11: "Dezembro",
    };

    if (task && value) {
      console.log(task?.id);
      const { id } = task;

      const indexOf = tasks.findIndex((item) => item.id === id);

      tasks[indexOf].title = value;
      tasks[indexOf].date = new Date().toString();
      setTasks(tasks);

      await fetch("/api/task", {
        method: "PUT",
        body: JSON.stringify({
          id: task.id,
          title: task.title,
        }),
      });

      setModalActive(false);
    }
  };

  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_title}>
          <span>Edição de tarefa:</span>
        </div>
        <div className={styles.modal_inputArea}>
          <input
            type="text"
            name="modal_edit-task"
            id="modal_edit-task"
            placeholder="Edite sua tarefa aqui"
            value={value}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
              setValue(e.currentTarget.value)
            }
          />
        </div>
        {value && (
          <div className={styles.preview_area}>
            <div className={styles.preview_title}>
              <span>Preview</span>
            </div>
            <div className={styles.preview_content}>
              <p className={styles.preview_content_title}>{value}</p>
              <span className={styles.preview_date}>
                {formatDateFromDatabase(new Date().toString())}
              </span>
            </div>
          </div>
        )}
        <div className={styles.button_area}>
          <button
            className={styles.button}
            onClick={() => setModalActive(false)}
          >
            Cancelar
          </button>
          <button
            className={styles.button}
            disabled={!value}
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
