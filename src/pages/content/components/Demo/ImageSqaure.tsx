import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

import { COLOR } from "@src/shared/constants/color";

type MergedHTMLImgAttributes = Omit<
  React.HTMLAttributes<HTMLElement> & React.ImgHTMLAttributes<HTMLElement>,
  "src"
>;

interface IProps extends MergedHTMLImgAttributes {
  width?: string;
  alt?: string;
  src: string | null;
  background?: string;
  borderRadius?: string;
  styles?: SerializedStyles;
}

export const ImageSquare = ({
  width = "100%",
  src,
  alt = "이미지",
  background = "transparent",
  borderRadius = "0.5rem",
  styles,
  ...rest
}: IProps) => {
  return (
    <Wrapper
      width={width}
      height={width}
      background={background}
      borderRadius={borderRadius}
      css={styles}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        style={{
          objectFit: "contain",
          height: "100%",
          width: "100%",
          backgroundRepeat: "no-repeat",
          borderRadius,
          aspectRatio: 1,
        }}
        {...rest}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<any>`
  position: relative;
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.width ?? "100%"};
  background: ${(props) => props.background ?? COLOR.GRAY};
  border-radius: ${(props) => props.borderRadius ?? "0.5rem"};
`;
