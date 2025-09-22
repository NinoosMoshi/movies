import styles from "./MultipleSelection.module.css";
import type MultipleSelectionDTO from "./MultipleSelectionDTO.model";


export default function MultipleSelection(props: MultipleSelectionProps) {

    function select(item: MultipleSelectionDTO) {
        const selected = [...props.selected, item];
        const nonSelected = props.nonSelected.filter(value => value !== item);
        props.onChange(selected, nonSelected);
    }

    function deSelect(item: MultipleSelectionDTO) {
        const nonSelected = [...props.nonSelected, item];
        const selected = props.selected.filter(value => value !== item);
        props.onChange(selected, nonSelected);
    }

    function selectAll() {
        const selected = [...props.selected, ...props.nonSelected];
        const nonSelected: MultipleSelectionDTO[] = [];
        props.onChange(selected, nonSelected);
    }

    function deSelectAll() {
        const nonSelected = [...props.nonSelected, ...props.selected];
        const selected: MultipleSelectionDTO[] = [];
        props.onChange(selected, nonSelected);
    }



    return (
        <div className={styles.multipleSelectors}>
            <ul className={styles.list}>
                {props.nonSelected.map(item => <li key={item.key} onClick={() => select(item)}>
                    {item.description}
                </li>)
                }
            </ul>
            <div className={styles.buttons}>
                <button type="button" onClick={selectAll}>{'>>'}</button>
                <button type="button" onClick={deSelectAll}>{'<<'}</button>
            </div>

            <ul className={styles.list}>
                {props.selected.map(item => <li key={item.key} onClick={() => deSelect(item)}>{item.description}</li>)}
            </ul>
        </div>
    )
}

interface MultipleSelectionProps {
    selected: MultipleSelectionDTO[];
    nonSelected: MultipleSelectionDTO[];
    onChange: (selected: MultipleSelectionDTO[], nonSelected: MultipleSelectionDTO[]) => void;
}