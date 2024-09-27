import { useUser } from '@/Providers/UserContext';
import Tree from 'react-d3-tree';
import { Transaction } from '@/declarations/backend/backend.did';
import backend from '@/declarations/export';
import { useEffect, useState } from 'react';
import { useBudget } from '@/Providers/BudgetContext';

// Define the structure for tree nodes
interface TreeNode {
  name: string;
  children?: TreeNode[];
  id: string;
  attributes?: {
    Amount: number;
  };
}

const TransactionFlow: React.FC = () => {
  const { budget, isLoading: loadingBudget } = useBudget();
  const { isLoading, user } = useUser();
  const [orgChart, setOrgChart] = useState<TreeNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Recursive function to build the tree structure
  const buildTransactionTree = async (
    transaction: Transaction,
    depth: number,
    visited: Set<string>,
  ): Promise<TreeNode> => {
    const { to, amount } = transaction;

    // Prevent infinite recursion by adding a depth limit
    if (depth > 10) {
      console.warn('Depth limit reached for user:', to.name);
      return {
        name: `${to.name} (Max Depth Reached)`,
        id: to.id,
      };
    }

    // Avoid circular references by checking if we've already visited this user
    if (visited.has(to.id)) {
      console.warn('Circular reference detected for user:', to.name);
      return { name: ``, id: to.id };
    }

    visited.add(to.id); // Track the user we've visited

    // Fetch the 'to' user's details
    const temp = await backend.getUser(to.id);
    const toUser = temp[0];

    // Create the base node
    const node: TreeNode = {
      name: to.name,
      id: to.id,
      attributes: {
        Amount: Number(amount),
      },
      children: [],
    };

    // Recursively fetch and process child transactions
    if (toUser && toUser.transactions && toUser.transactions.length > 0) {
      node.children = await Promise.all(
        toUser.transactions.map(
          async ([_, childTransaction]: [string, Transaction]) => {
            return await buildTransactionTree(
              childTransaction,
              depth + 1,
              visited,
            );
          },
        ),
      );
    }

    return node;
  };

  // Function to build the org chart from the root user's transactions
  const buildOrgChart = async (): Promise<TreeNode> => {
    try {
      // Start with the current user (root node)
      const rootNode: TreeNode = {
        name: user?.name || 'User',
        id: user?.id || '',
        attributes: {
          Amount: Number(budget?.remAmt),
        },
        children: [],
      };

      // Recursively process the root user's transactions
      rootNode.children = await Promise.all(
        user?.transactions?.map(
          async ([_, transaction]: [string, Transaction]) => {
            return await buildTransactionTree(
              transaction,
              0,
              new Set<string>(),
            );
          },
        ) || [],
      );

      return rootNode;
    } catch (err) {
      console.error('Error building org chart:', err);
      setError('Failed to load the org chart.');
      return { name: 'Error', id: 'error' }; // Fallback node
    }
  };

  // Fetch the org chart on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const chart = await buildOrgChart();
        setOrgChart(chart); // Set state here
      }
    };

    fetchData(); // Ensure it's called only once when the component mounts
  }, [user]); // Dependency on user

  // Handle loading and error states
  if (isLoading && loadingBudget) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!orgChart) return <div>Loading chart...</div>;

  // Render the tree
  return (
    <div id="treeWrapper" className="h-screen w-screen">
      <Tree
        data={orgChart}
        orientation="horizontal"
        translate={{ x: 200, y: 100 }}
        nodeSize={{ x: 150, y: 200 }} // Adjust node size
        separation={{ siblings: 1, nonSiblings: 1 }}
      />
    </div>
  );
};

export default TransactionFlow;
