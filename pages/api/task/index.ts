// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { api_tasks as api } from "../../../libs/api/tasks";
import { Task } from "../../../Types/Task/task";

export const handlePut: NextApiHandler = async (req, res) => {
  try {
    const paramsBody = JSON.parse(req.body);

    let data = {};

    const requireds: string[] = ["id", "title"];
    const paramsRequireds: any = [];

    Object.keys(paramsBody).forEach((item) => {
      Object.assign(data, {
        [item]: paramsBody[item],
      });
    });

    requireds.forEach((item) => {
      if (!Object.keys(paramsBody).includes(item)) paramsRequireds.push(item);
    });

    if (paramsRequireds.length >= 1) {
      throw `Campos obrigatório no corpo da requisição: (${paramsRequireds
        .toString()
        .split(",")
        .join(", ")})`;
    }

    type Post = {
      id: string;
      title: string;
    };

    try {
      const getUser = await api.editTaskById(data as Post);

      if (getUser) {
        res.status(200).json({ message: "Sucesso!", data: getUser });
        return;
      }
    } catch (e) {
      res.status(500).json({
        message: "Não foi possível conectar com o Banco de Dados!",
        data: null,
      });
      return;
    }

    res
      .status(404)
      .json({ message: "Não existe nenhum usuário com este ID!", data: null });
  } catch (e) {
    res.status(500).json({
      message: e,
      data: null,
    });
    return;
  }
};

export const handlePost: NextApiHandler = async (req, res) => {
  try {
    const paramsBody = JSON.parse(req.body);

    let data = {};

    const requireds: string[] = ["id", "title", "userId"];
    const paramsRequireds: any = [];

    Object.keys(paramsBody).forEach((item) => {
      Object.assign(data, {
        [item]: paramsBody[item],
      });
    });

    requireds.forEach((item) => {
      if (!Object.keys(paramsBody).includes(item)) paramsRequireds.push(item);
    });

    if (paramsRequireds.length >= 1) {
      throw `Campos obrigatório no corpo da requisição: (${paramsRequireds
        .toString()
        .split(",")
        .join(", ")})`;
    }

    type Post = {
      id: string;
      title: string;
      userId: string;
    };

    try {
      const getUser = await api.addTask(data as Post);

      if (getUser) {
        res.status(200).json({ message: "Sucesso!", data: getUser });
        return;
      }
    } catch (e) {
      res.status(500).json({
        message: "Não foi possível conectar com o Banco de Dados!",
        data: null,
      });
      return;
    }

    res
      .status(404)
      .json({ message: "Não existe nenhum usuário com este ID!", data: null });
  } catch (e) {
    res.status(500).json({
      message: e,
      data: null,
    });
    return;
  }
};

export const handleDelete: NextApiHandler = async (req, res) => {
  try {
    const paramsBody = JSON.parse(req.body);

    console.log(paramsBody);

    let data = {};

    const requireds: string[] = ["id"];
    const paramsRequireds: any = [];

    Object.keys(paramsBody).forEach((item) => {
      Object.assign(data, {
        [item]: paramsBody[item],
      });
    });

    requireds.forEach((item) => {
      if (!Object.keys(paramsBody).includes(item)) paramsRequireds.push(item);
    });

    if (paramsRequireds.length >= 1) {
      throw `Campos obrigatório no corpo da requisição: (${paramsRequireds
        .toString()
        .split(",")
        .join(", ")})`;
    }

    try {
      const getUser = await api.deleteTaskById(data as Pick<Task, "id">);

      console.log(getUser);

      if (getUser) {
        res.status(200).json({ message: "Sucesso!", data: getUser });
        return;
      }
    } catch (e) {
      res.status(500).json({
        message: "Não foi possível conectar com o Banco de Dados!",
        data: null,
      });
      return;
    }

    res
      .status(404)
      .json({ message: "Não existe nenhum usuário com este ID!", data: null });
  } catch (e) {
    res.status(500).json({
      message: e,
      data: null,
    });
    return;
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      handlePut(req, res);
      break;
    case "DELETE":
      handleDelete(req, res);
      break;

    case "POST":
      handlePost(req, res);
      break;
  }
}
