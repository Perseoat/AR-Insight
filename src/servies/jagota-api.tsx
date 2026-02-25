import axios from "axios";

// Create a central axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/v1",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQ29kZSI6IkpCVDA0IiwibG9jYXRpb25JZCI6IjAiLCJjb21wYW55IjoiSkIiLCJkZXZpY2VVbmlxdWVJZGVudGlmaWVyIjoiZDUyMGM3YTgtNDIxYi00NTYzLWI5NTUtZjVhYmM1NmI5N2VjIiwiaWF0IjoxNzcxODMzOTI2LCJleHAiOjE4MDMzNjk5MjZ9.CAqd7ZVxlYM4RkwsH5M5pRMuyELN2mIZ6moc70Y3oyM",
    "Content-Type": "application/json",
  },
});

/**
 * Get KPI Summary for AR Insight
 * @param arUser - User code (defaults to % for all)
 */
export const getKPISummary = async (
  arUser: string = "%",
  fromDate: string = "20200101",
  toDate: string = "20201231",
) => {
  try {
    const response = await api.get(`/ar-insight/kpi-summary`, {
      params: { arUser, fromDate, toDate },
    });

    // Check structure based on providing JSON format
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data[0];
    }
    return null;
  } catch (error) {
    console.error("API Error (getKPISummary):", error);
    throw error;
  }
};

export const getAgingBucket = async (
  arUser: string = "%",
  fromDate: string = "20200101",
  toDate: string = "20201231",
) => {
  try {
    const response = await api.get(`/ar-insight/aging-bucket`, {
      params: { arUser, fromDate, toDate },
    });

    // Check structure based on providing JSON format
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("API Error (getAgingBucket):", error);
    throw error;
  }
};

export const getAgingTrend = async (
  arUser: string = "%",
  fromDate: string = "20200101",
  toDate: string = "20201231",
) => {
  try {
    const response = await api.get(`/ar-insight/aging-trend`, {
      params: { arUser, fromDate, toDate },
    });

    // Check structure based on providing JSON format
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("API Error (getAgingTrend):", error);
    throw error;
  }
};

export const getTopDebtors = async (
  arUser: string = "%",
  fromDate: string = "20200101",
  toDate: string = "20201231",
  limit: string = "TOP",
) => {
  try {
    const response = await api.get(`/ar-insight/top-debtor`, {
      params: { arUser, fromDate, toDate, limit },
    });

    // Check structure based on providing JSON format
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("API Error (getTopDebtors):", error);
    throw error;
  }
};

// You can add more central functions here
// export const getOtherData = ...

export default api;
