import React from 'react';
import { useAuthStore } from '../store/authStore';
import Landing from './Landing';
import ItemsFeed from './ItemsFeed';

export default function Home() {
  const { user } = useAuthStore();
  
  return user ? <ItemsFeed /> : <Landing />;
}