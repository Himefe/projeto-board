import { UserParam } from "../../../Types/User/user";
import prisma from "../../prisma/prisma";

export const api_user = {
  async saveLoggedUser(user: UserParam) {
    const _user = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    return _user;
  },

  async verifyUserExist(id: string) {
    const userFinded = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return userFinded ? true : false;
  },
};
