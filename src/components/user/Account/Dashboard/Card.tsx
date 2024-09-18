import {
  Card as C,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

interface Props {
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
}

const Card: React.FC<Props> = ({ body, footer, title }) => {
  return (
    <C className='w-full' >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-black text-4xl">{body}</p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </C>
  );
};

export default Card;
