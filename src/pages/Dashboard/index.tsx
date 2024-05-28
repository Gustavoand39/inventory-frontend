import LowProducts from "./products/LowProducts";
import RecentInventoryLog from "./inventoryLog/RecentInventoryLog";

const Dashboard = () => {
  return (
    <>
      <LowProducts />

      <RecentInventoryLog />
    </>
  );
};

export default Dashboard;
