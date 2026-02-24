import React, { useState, useEffect } from 'react';
import { getKPISummary } from './jagota-api';

const ARDashboardKPI = () => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPI = async () => {
      try {
        const data = await getKPISummary();
        if (data) {
          setKpiData(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching KPI:", error);
        setLoading(false);
      }
    };

    fetchKPI();
  }, []);

  if (loading) return <div>กำลังดึงข้อมูลจาก Oracle 12g...</div>;
  if (!kpiData) return <div>ไม่พบข้อมูล</div>;

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* 1. ลูกค้าทั้งหมด (Total Balance) */}
      <div className="card">
        <h3>Total AR</h3>
        <p>{kpiData.TOTAL.toLocaleString()} THB</p>
      </div>

      {/* 2. ยังไม่ถึงกำหนดชำระ */}
      <div className="card">
        <h3>Not Yet Due</h3>
        <p style={{ color: 'green' }}>{kpiData.NOT_YET_DUE.toLocaleString()} THB</p>
      </div>

      {/* 3. ครบกำหนดชำระวันนี้ */}
      <div className="card">
        <h3>Due Today</h3>
        <p>{kpiData.DUE_TODAY.toLocaleString()} THB</p>
      </div>

      {/* 4. เกินกำหนดชำระ */}
      <div className="card">
        <h3>Overdue</h3>
        <p style={{ color: 'red' }}>{kpiData.OVERDUE.toLocaleString()} THB</p>
      </div>
    </div>
  );
};

export default ARDashboardKPI;