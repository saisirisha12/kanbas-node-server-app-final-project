import EnrollmentModel from "../models/schemas/enrollment";
import UserModel from "../models/schemas/user";
import { User } from "../models/user";

export const createUser = async (user: User) => {
  try {
    if (user._id) {
      delete user._id;
    }
    const newUser = new UserModel(user);
    return await newUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error creating user: " + error.message);
    } else {
      throw new Error("Error creating user: Unknown error");
    }
  }
};

export const findAllUsers = async () => {
  try {
    return await UserModel.find();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding users: " + error.message);
    } else {
      throw new Error("Error finding users: Unknown error");
    }
  }
};

export const findUsersByRole = async (role: string) => {
  try {
    return await UserModel.find({ role });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding users: " + error.message);
    } else {
      throw new Error("Error finding users: Unknown error");
    }
  }
};

export const findUsersByPartialName = async (name: string) => {
  try {
    return await UserModel.find({
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding users: " + error.message);
    } else {
      throw new Error("Error finding users: Unknown error");
    }
  }
};

export const findUserById = async (id: string) => {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding user: " + error.message);
    } else {
      throw new Error("Error finding user: Unknown error");
    }
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    return await UserModel.findOne({ username });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding user: " + error.message);
    } else {
      throw new Error("Error finding user: Unknown error");
    }
  }
};

export const findUserByCredentials = async (
  username: string,
  password: string
) => {
  try {
    const user = await UserModel.findOne({ username, password });
    return user || null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding user: " + error.message);
    } else {
      throw new Error("Error finding user: Unknown error");
    }
  }
};

export const updateUser = async (id: string, user: User) => {
  try {
    return await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating user: " + error.message);
    } else {
      throw new Error("Error updating user: Unknown error");
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    await EnrollmentModel.deleteMany({ user: id });
    return await UserModel.findByIdAndDelete(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting user: " + error.message);
    } else {
      throw new Error("Error deleting user: Unknown error");
    }
  }
};
