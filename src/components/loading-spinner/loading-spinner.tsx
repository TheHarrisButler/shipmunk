import { Spinner, SpinnerSize } from "@shipengine/giger";
import { styles } from "./loading-spinner-styles";

export type LoaderProps = {
  message?: string;
};

export const LoadingSpinner = ({ message }: LoaderProps) => {
  return (
    <div css={styles.loadingSpinner}>
      <Spinner message={message} size={SpinnerSize.SIZE_LARGE} />
    </div>
  );
};
