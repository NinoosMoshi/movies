import { useState, type ChangeEvent } from "react";
import styles from "./SelectImage.module.css";

export default function SelectImage(props: SelectImageProps) {

    const [imageBase64, setImageBase64] = useState<string>("");
    const [imageUrl, setImageUrl] = useState(props.imageUrl ? props.imageUrl : "");

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            toBase64(file).then(value => setImageBase64(value))
                .catch(error => console.error(error));

            props.selectedImage(file);
            setImageUrl("");
        }
    }

    function toBase64(file: File) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <div className="form-group">
            <label>Select Image</label>
            <input type="file" accept=".jpg, .png, .jpeg" onChange={handleOnChange} className="form-control" />
            {imageBase64 ?
                <div className={styles.div}>
                    <img src={imageBase64} alt=" selected image" className="img-thumbnail" />
                </div>
                : undefined
            }

            {imageUrl ?
                <div className={styles.div}>
                    <img src={imageUrl} alt=" selected image" className="img-thumbnail" />
                </div>
                : undefined
            }
        </div>
    )
}

interface SelectImageProps {
    selectedImage: (file: File) => void;
    imageUrl?: string;
}
