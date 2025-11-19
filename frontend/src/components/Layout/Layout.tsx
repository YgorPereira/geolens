import type { ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout_container}>
      <Sidebar />
      <main className={styles.main_content}>
        {children}
      </main>
    </div>
  );
};