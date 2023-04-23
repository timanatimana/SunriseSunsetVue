import axios from "axios";
jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;

export default axiosMock;

