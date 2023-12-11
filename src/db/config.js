import { Sequelize } from "sequelize";
const sequelize = new Sequelize("user", "postgres", "Humanrights1", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
  logging: false,
});
export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(" database connected");
  } catch (error) {
    console.log("unable to connect", error);
  }
};
export default sequelize;
