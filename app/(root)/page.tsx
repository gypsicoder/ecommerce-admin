import {UserButton} from '@clerk/nextjs';
import React from 'react';

export default function SetupPage() {
  return (
    <div className='p-4'>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
