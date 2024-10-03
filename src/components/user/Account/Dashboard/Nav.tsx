import { MdSpaceDashboard } from 'react-icons/md';
import { RiUserForbidFill } from 'react-icons/ri';
import { FaWallet } from 'react-icons/fa';
import { IoStatsChartSharp, IoLogOut } from 'react-icons/io5';
import { PiMoneyWavyFill } from 'react-icons/pi';
import { useUser } from '@/Providers/UserContext';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Nav: React.FC<{
  selected: 'dashboard' | 'budget' | 'transactions' | 'reports' | 'stats' | 'taxes' | 'properties' ;
}> = ({ selected }) => {
  useAuth();
  const { user } = useUser();

  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out');
  };

  return (
    <div className="w-64 flex flex-col justify-between ">
      <div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/assets/bw.png"
                className="w-6 h-auto"
                alt="Sushasan Logo"
              />
              <p className="text-slate-900 font-black text-3xl">Sushasan</p>
            </div>
            <div>
              <p className="font-bold text-sm">Account No.: {user?.id}</p>
            </div>
          </div>

          <div className="border w-28"></div>
          <ul className="flex flex-col gap-1 pr-6">
            <div className="flex flex-col ">
              <Link
                to="/account"
                className={`font-bold flex gap-1 items-center rounded-lg ${
                  selected == 'dashboard'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-900'
                } px-3 py-2`}
              >
                <MdSpaceDashboard />
                <p>Dashboard</p>
              </Link>
              {user?.role=='user' ? <Link
                to="/account/myproperty"
                className={`font-bold flex gap-1 items-center rounded-xl ${
                  selected == 'properties'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-900'
                } px-3 py-2`}
              >
                <PiMoneyWavyFill />
                <p>Properties</p>
              </Link> :<Link
                to="/account/budgets"
                className={`font-bold flex gap-1 items-center rounded-xl ${
                  selected == 'budget'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-900'
                } px-3 py-2`}
              >
                <PiMoneyWavyFill />
                <p>Budgets</p>
              </Link>}
              {user?.role=='tax' && <Link
                to="/account/tax-billing"
                className={`font-bold flex gap-1 items-center rounded-xl ${
                    selected == 'taxes'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-900'
                } px-3 py-2`}
              >
                <FaWallet />
                <p>Tax Billing</p>
              </Link>}
              <Link
                to="/account/transactions"
                className={`font-bold flex gap-1 items-center rounded-xl ${
                  selected == 'transactions'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-900'
                } px-3 py-2`}
              >
                <FaWallet />
                <p>Transactions</p>
              </Link>
              {user?.role == 'admin' && (
                <Link
                  to="/account/reports"
                  className={`font-bold flex gap-1 items-center rounded-xl ${
                    selected == 'reports'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-900'
                  } px-3 py-2`}
                >
                  <RiUserForbidFill />
                  <p>Reports</p>
                </Link>
              )}
              <Link
                to="/account/stats"
                className={`font-bold flex gap-1 items-center rounded-xl ${
                  selected == 'stats'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-900'
                } px-3 py-2`}
              >
                <IoStatsChartSharp />
                <p>Statistics</p>
              </Link>
              
            </div>
          </ul>
        </div>
      </div>
      <div
        className="font-bold text-slate-900 flex gap-1 items-center cursor-pointer"
        onClick={handleLogout}
      >
        <IoLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Nav;
