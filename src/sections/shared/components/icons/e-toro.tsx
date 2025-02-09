type Props = {
  height: number
  width: number
  strokeWidth: number
}

const EToroIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="a"
      fill="#000"
      viewBox="0 0 48 48"
      {...props}
    >
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style>
            {
              ".b{fill:none;stroke:#FFF;stroke-linecap:round;stroke-linejoin:round}"
            }
          </style>
        </defs>
        <path
          d="M30.459 36.447a7.6 7.6 0 0 1-6.606 3.836h0a7.602 7.602 0 0 1-7.602-7.602v-4.942a7.602 7.602 0 0 1 7.602-7.602h0a7.602 7.602 0 0 1 7.603 7.602v2.47H16.25M16.544 20.137c-1.952 1.992-3.196 4.298-3.196 8.98-3.56-.404-7.848-2.305-7.848-6.796S12.944 9.375 15.533 7.717C13.429 11.722 12.7 15.282 12.7 17.75s3.843 2.387 3.843 2.387ZM31.456 20.137c1.952 1.992 3.196 4.298 3.196 8.98 3.56-.404 7.848-2.305 7.848-6.796 0-4.49-7.444-12.946-10.033-14.604 2.104 4.005 2.832 7.565 2.832 10.033s-3.843 2.387-3.843 2.387Z"
          className="b"
          strokeWidth={props.strokeWidth}
        />
      </g>
    </svg>
  )
}

export { EToroIcon }
