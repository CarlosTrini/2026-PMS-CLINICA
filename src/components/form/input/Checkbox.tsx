import type React from "react";
import { useState } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // checked: boolean;
  // className?: string;
  // id?: string;
  // onChange: (checked: boolean) => void;
  error?: boolean;
  // disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  // checked,
  id,
  onChange,
  error = false,
  className = "",
  disabled = false,
  ...props
}) => {


  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      className={`group flex cursor-pointer items-center gap-3 ${disabled ? "cursor-not-allowed opacity-60" : ""
        }`}
    >
      <div className={`relative h-5 w-5`}>
        <input
          id={id}
          type="checkbox"
          className={`h-5 w-5 cursor-pointer appearance-none rounded-md border  ${error ? "border-error border-2" : "border-gray dark:border-gray"} checked:border-transparent checked:bg-brand disabled:opacity-60  ${className}`}
          checked={isChecked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsChecked(e.target.checked);
            onChange?.(e);
          }}
          disabled={disabled}
          {...props}
        />
        {isChecked && (
          <svg
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {disabled && (
          <svg
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="#E4E7EC"
              strokeWidth="2.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-dark dark:text-gray-light">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;



// import type React from "react";

// interface CheckboxProps {
//   label?: string;
//   checked: boolean;
//   className?: string;
//   id?: string;
//   onChange: (checked: boolean) => void;
//   disabled?: boolean;
// }

// const Checkbox: React.FC<CheckboxProps> = ({
//   label,
//   checked,
//   id,
//   onChange,
//   className = "",
//   disabled = false,
// }) => {
//   return (
//     <label
//       className={`group flex cursor-pointer items-center gap-3 ${
//         disabled ? "cursor-not-allowed opacity-60" : ""
//       }`}
//     >
//       <div className={`relative h-5 w-5`}>
//         <input
//           id={id}
//           type="checkbox"
//           className={`h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-light checked:border-transparent checked:bg-brand disabled:opacity-60 dark:border-gray-dark ${className}`}
//           checked={checked}
//           onChange={(e) => onChange(e.target.checked)}
//           disabled={disabled}
//         />
//         {checked && (
//           <svg
//             className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
//             xmlns="http://www.w3.org/2000/svg"
//             width="14"
//             height="14"
//             viewBox="0 0 14 14"
//             fill="none"
//           >
//             <path
//               d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
//               stroke="white"
//               strokeWidth="1.94437"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         )}
//         {disabled && (
//           <svg
//             className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
//             xmlns="http://www.w3.org/2000/svg"
//             width="14"
//             height="14"
//             viewBox="0 0 14 14"
//             fill="none"
//           >
//             <path
//               d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
//               stroke="#E4E7EC"
//               strokeWidth="2.33333"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         )}
//       </div>
//       {label && (
//         <span className="text-sm font-medium text-gray-dark dark:text-gray-light">
//           {label}
//         </span>
//       )}
//     </label>
//   );
// };

// export default Checkbox;
