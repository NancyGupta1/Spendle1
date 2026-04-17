/**
 * transactionApi.js
 * -----------------
 * API abstraction layer — currently backed by localStorage.
 * Swap the internals for Supabase / Axios calls without
 * touching any component.
 *
 * Supabase example (drop-in replacement):
 *
 *   import { supabase } from './supabaseClient';
 *
 *   export const getTransactions = async () => {
 *     const { data, error } = await supabase
 *       .from('transactions')
 *       .select('*')
 *       .order('date', { ascending: false });
 *     if (error) throw error;
 *     return data;
 *   };
 */

const KEY = 'spendle_transactions';

const delay = (ms = 0) => new Promise(r => setTimeout(r, ms));

export const getTransactions = async () => {
  await delay();
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

export const addTransaction = async (tx) => {
  await delay();
  const list = await getTransactions();
  const newList = [tx, ...list];
  localStorage.setItem(KEY, JSON.stringify(newList));
  return tx;
};

export const deleteTransaction = async (id) => {
  await delay();
  const list = await getTransactions();
  const newList = list.filter(t => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(newList));
  return id;
};

export const updateTransaction = async (id, updates) => {
  await delay();
  const list = await getTransactions();
  const newList = list.map(t => t.id === id ? { ...t, ...updates } : t);
  localStorage.setItem(KEY, JSON.stringify(newList));
  return newList.find(t => t.id === id);
};
