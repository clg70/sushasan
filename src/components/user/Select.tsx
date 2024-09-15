import {
  Select as S,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/declarations/backend/backend.did';

import backend from '@/declarations/export';
import { useEffect, useState } from 'react';
const SelectDepartments: React.FC<{
  onSelect?: (id: string) => void;
}> = ({ onSelect }) => {
  const [depts, setDepts] = useState<User[]>([]);
  const fetchDepartments = async () => {
    const response = await backend.getAllDepts();
    console.log(response);
    let users: User[] = [];
    if (response) {
      response.map((dept) => {
        users.push(dept[1]);
      });
    }

    users = users.filter((dept) => dept.role == 'dept');

    setDepts(users);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);
  return (
    <S onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select One" />
      </SelectTrigger>
      <SelectContent>
        {depts.map((department) => {
          return (
            <SelectItem value={department.id}>{department.name}</SelectItem>
          );
        })}
      </SelectContent>
    </S>
  );
};

export default SelectDepartments;
