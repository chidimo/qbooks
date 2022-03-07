import * as React from 'react';

export const CartIcon = (props: any) => {
  return (
    <svg
      width={props.width || 15}
      height={props.height || 16}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.666 9.018l-9.486.959a.564.564 0 00-.485.535c0 .234.191.426.426.426h9.481a.639.639 0 110 1.278H4.088a1.706 1.706 0 01-1.67-1.704c0-.444.168-.874.475-1.213.307-.34.718-.55 1.16-.594l.306-.03-1.996-6.897H1.139A.64.64 0 011.14.5h1.704c.285 0 .535.188.614.461l.36 1.243h9.785c.353 0 .64.286.64.64v5.538a.64.64 0 01-.576.636zm-.703-5.536H4.187l1.465 5.063 7.311-.742v-4.32z"
        fill={props.fill || '#000'}
      />
      <path
        d="M2.737 15.5a1.385 1.385 0 100-2.77 1.385 1.385 0 000 2.77zM12.857 15.5a1.385 1.385 0 100-2.77 1.385 1.385 0 000 2.77z"
        fill={props.fill || '#000'}
      />
    </svg>
  );
};
