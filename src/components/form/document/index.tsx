import { DocumentIcon, DownloadIcon, TrashIcon, WarningIcon } from "assets";
import styles from "./styles.module.css";
import { getMegaByte } from "helpers";

export interface DocumentProps {
  id: string;
  label?: string;
  file: File | undefined | string;
  handleChangeDoc: ({ id, e }) => void;
  handleRemoveDoc: ({ id }) => void;
  className?: string;
  uploadedDocClassName?: string;
  error?: string;
}

export const DocumentInput: React.FC<DocumentProps> = ({
  id,
  label,
  file,
  handleChangeDoc,
  handleRemoveDoc,
  className,
  error,
  uploadedDocClassName,
}) => {
  return (
    <div className={`${styles.docWrap} ${className}`}>
      <p className={styles.docName}>{label}</p>
      {!file ? (
        <>
          <label
            className={`${styles.docLabel} ${error ? styles.emptyDoc : ""}`}
            htmlFor={id}
          >
            <DownloadIcon />
            <p>
              {/* Drop your file to upload or  */}
              <span>Browse</span>
            </p>
            <p className={styles.docNote}>
              Maximum size 8MB, PDF, JPG, PNG
            </p>
            <input
              style={{ display: "none" }}
              id={id}
              type={"file"}
              accept=".pdf, .png, .jpg, .jpeg"
              onDrop={(e) => console.log(e, "drop")}
              onChange={(e) => handleChangeDoc({ id, e })}
            />
          </label>
        </>
      ) : (
        <div className={`${styles.uploadedDoc} ${uploadedDocClassName}`}>
          <DocumentIcon className={styles.docIcon} />
          <div className={styles.docInfo}>
            <p>{typeof file === "string" ? label : file.name}</p>
            {typeof file === "string" ? "" : <p>{getMegaByte(file.size)}MB</p>}
          </div>
          <TrashIcon
            onClick={() => handleRemoveDoc({ id })}
            role="button"
            className={styles.docDelete}
          />
        </div>
      )}
      {error && !file && (
        <p className={styles.errorMsg}>
          <WarningIcon /> {error}
        </p>
      )}
    </div>
  );
};
