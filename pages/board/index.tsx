import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import * as uuid from "uuid";

import Head from "next/head";
import Image from "next/image";
import React, { FormEvent } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import styles from "./style.module.css";
import Modal from "../Components/Modal";
import { api_tasks } from "../../libs/api/tasks";
import { formatDateFromDatabase } from "../../helper/formatDate";
import { useSession } from "next-auth/react";
import { Task } from "../../Types/Task/task";
import useMatchMedia from "../../Hooks/useMatchMedia";

type Tasks = {
  id: string;
  title: string | undefined;
  date: string;
};

const Board = ({ dataTasks }: { dataTasks: Tasks[] }) => {
  const [tasks, setTasks] = React.useState<Tasks[]>(dataTasks);
  const [modalActive, setModalActive] = React.useState<true | false>(false);
  const [taskModal, setTaskModal] = React.useState<Tasks | null>(null);

  const task_ref = React.useRef<HTMLInputElement | null>(null);

  const { data: session } = useSession();

  const matchMedia = useMatchMedia("(max-width: 767px)");

  const closeModal = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const modal_parent = e.currentTarget;
    const target = e.target;

    if (target === modal_parent) {
      setModalActive(false);
      setTaskModal(null);
    }
  };

  const handleEdit = (task: Tasks) => {
    setTaskModal(task);
    setModalActive(!modalActive);
  };

  const handleTask = async (e: FormEvent) => {
    e.preventDefault();
    const date = new Date();

    const taskCreater: Tasks = {
      id: uuid.v4(),
      title: task_ref.current?.value,
      date: date.toString(),
    };

    if (task_ref.current?.value) {
      const newObj = {
        id: taskCreater.id,
        title: taskCreater.title,
        userId: session?.user.id,
      };

      await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(newObj),
      });

      setTasks([{ ...taskCreater }, ...tasks]);

      task_ref.current.value = "";
      task_ref.current.focus();
    }
  };

  const handleRemove = async (task: Tasks) => {
    const taskDeleted = tasks.filter((item) => item.id !== task.id);

    await fetch("/api/task", {
      method: "DELETE",
      body: JSON.stringify({
        id: task.id,
      }),
    });

    setTasks(taskDeleted);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Board</title>
      </Head>
      <div className={styles.content}>
        {modalActive ? (
          <Modal
            closeModal={closeModal}
            task={taskModal as any}
            setTasks={setTasks}
            setModalActive={setModalActive}
            tasks={tasks as { id: string; title: string; date: string }[]}
          />
        ) : null}
        <div className={styles.input_area}>
          <form
            style={{ width: "100%" }}
            className={styles.input_area}
            onSubmit={handleTask}
          >
            <div className={styles.input_content}>
              <input
                type="text"
                name="input_tarefa"
                id="input_tarefa"
                placeholder="Qual sua tarefa?"
                ref={task_ref}
              />
            </div>
            <button className={styles.adicionar_button}>+</button>
          </form>
        </div>
        <div className={styles.tasks_container}>
          {!tasks.length && <p className={styles.not_tasks}>Não há tarefas!</p>}
          {tasks.map((item, index) => (
            <div className={styles.tasks_content} key={index}>
              <p className={styles.task_title}>{item.title}</p>
              <div className={styles.date_edit_delete}>
                <div className={styles.date_edit_container}>
                  <div className={styles.date}>
                    <Image
                      src="/calendar.svg"
                      width={18}
                      height={18}
                      alt="Calendário - Ícone"
                    />
                    <p>{formatDateFromDatabase(item.date)}</p>
                  </div>
                  {matchMedia && (
                    <div className={styles.mobile}>
                      <div
                        className={styles.edit}
                        tabIndex={0}
                        onClick={() => handleEdit(item)}
                      >
                        <Image
                          src="/edit-2.svg"
                          alt="Ícone - Edição"
                          width={24}
                          height={24}
                        />
                        <p>Editar</p>
                      </div>
                      <div
                        className={styles.delete_content}
                        tabIndex={0}
                        onClick={() => handleRemove(item)}
                      >
                        <Image
                          src="/trash.svg"
                          alt="Ícone - Excluir"
                          width={24}
                          height={24}
                        />
                        <p>Excluir</p>
                      </div>
                    </div>
                  )}
                  {!matchMedia && (
                    <div
                      className={styles.edit}
                      tabIndex={0}
                      onClick={() => handleEdit(item)}
                    >
                      <Image
                        src="/edit-2.svg"
                        alt="Ícone - Edição"
                        width={24}
                        height={24}
                      />
                      <p>Editar</p>
                    </div>
                  )}
                </div>
                {!matchMedia && (
                  <div
                    className={styles.delete_content}
                    tabIndex={0}
                    onClick={() => handleRemove(item)}
                  >
                    <Image
                      src="/trash.svg"
                      alt="Ícone - Excluir"
                      width={24}
                      height={24}
                    />
                    <p>Excluir</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: { destination: "/", permanent: true },
    };
  }

  const tasks = JSON.stringify(
    await api_tasks.getTasksByUserId(session.user.id)
  );

  return {
    props: {
      dataTasks: JSON.parse(tasks),
    },
  };
};

export default Board;
