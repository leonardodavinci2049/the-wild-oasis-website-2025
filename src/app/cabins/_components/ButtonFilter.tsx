import React from 'react'

type ButtonFilterProps = {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
};

const ButtonFilter: React.FC<ButtonFilterProps> = ({ filter, handleFilter, activeFilter, children }) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default ButtonFilter