import React from "react";
import { Link } from 'react-router-dom'
import { FiUser }  from "react-icons/fi"

function TopAccount() {
  return (
    <div>
      <Link className="header__user__auth__link">
        <div className="h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 hover:text-dwhite1 hover:bg-dblue1 flex justify-center items-center mb-1">
          <FiUser className="h-6 w-6 " />
        </div>
        <span className="header__icons-text whitespace-nowrap mt-1.5 text-d11">
          <p>My Account</p>
        </span>
      </Link>
    </div>
  );
}

export default TopAccount;
