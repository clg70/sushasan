import { MdSpaceDashboard } from 'react-icons/md';
import { RiUserForbidFill } from 'react-icons/ri';
import { FaWallet } from 'react-icons/fa';
import { IoStatsChartSharp } from 'react-icons/io5';
import { PiMoneyWavyFill } from 'react-icons/pi';
import { IoLogOut } from 'react-icons/io5';
import { useUser } from '@/Providers/UserContext';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
const Nav: React.FC = () => {
  useAuth();
  const { user } = useUser();
  return (
    <div className="w-64 flex flex-col justify-between ">
      <div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-bold text-slate-900 text-2xl">Hi, Admin</p>
            <p className="text-xs">Account No. {user?.id}</p>
          </div>
          <div className="border w-28"></div>
          <ul className="flex flex-col gap-1">
            <div>
              <Link
                to="/account"
                className="font-bold text-slate-900 flex gap-1 items-center"
              >
                <MdSpaceDashboard />
                <p>Dashboard</p>
              </Link>
              <Link
                to="/account/budgets"
                className="font-bold text-slate-900 flex gap-1 items-center"
              >
                <PiMoneyWavyFill />

                <p>Budgets</p>
              </Link>
              <Link
                to="/account/transactions"
                className="font-bold text-slate-900 flex gap-1 items-center"
              >
                <FaWallet />
                <p>Transactions</p>
              </Link>
              {user?.role == 'admin' && (
                <Link
                  to="/account/reports"
                  className="font-bold text-slate-900 flex gap-1 items-center"
                >
                  <RiUserForbidFill />
                  <p>Reports</p>
                </Link>
              )}

              <Link
                to="/account/stats"
                className="font-bold text-slate-900 flex gap-1 items-center"
              >
                <IoStatsChartSharp />
                <p>Statistics</p>
              </Link>
            </div>
          </ul>
        </div>
      </div>
      <li className="font-bold text-slate-900 flex gap-1 items-center">
        <IoLogOut />
        <p>Logout</p>
      </li>
    </div>
  );
};

export default Nav;
