import { Types } from "mongoose";
import { Module } from "../models/module";
import ModuleModel from "../models/schemas/module";

export const findModulesForCourse = async (courseId: string) => {
  try {
    const modules = await ModuleModel.find({
      course: new Types.ObjectId(courseId),
    });
    return modules;
  } catch (error) {
    return [];
  }
};

export const createModule = async (module: Module) => {
  try {
    const newModule = new ModuleModel(module);
    return await newModule.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error creating module: " + error.message);
    } else {
      throw new Error("Error creating module: Unknown error");
    }
  }
};

export const updateModule = async (moduleId: string, updatedModule: Module) => {
  try {
    return await ModuleModel.findByIdAndUpdate(
      // new Types.ObjectId(moduleId),
      moduleId,
      updatedModule,
      {
        new: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating module: " + error.message);
    } else {
      throw new Error("Error updating module: Unknown error");
    }
  }
};

export const deleteModule = async (moduleId: string) => {
  try {
    return await ModuleModel.findByIdAndDelete(moduleId);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting module: " + error.message);
    } else {
      throw new Error("Error deleting module: Unknown error");
    }
  }
};
