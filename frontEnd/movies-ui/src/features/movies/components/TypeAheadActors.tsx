import { Typeahead } from "react-bootstrap-typeahead"
import type MovieActor from "../models/MovieActor.model"
import type { Option } from "react-bootstrap-typeahead/types/types"
import { useState } from "react";

export default function TypeAheadActors(props: TypeAheadActorsProps) {

    const actors: MovieActor[] = [
        { id: 1, name: 'Tom Hanks', picture: 'https://api.screendollars.com/wp-content/uploads/2021/10/TOM-HANKS-PROFILE-1-scaled.jpg', character: 'Captain America' },
        { id: 2, name: 'Tom Cruise', picture: 'https://m.media-amazon.com/images/M/MV5BMmU1YWU1NmMtMjAyMi00MjFiLWFmZmUtOTc1ZjI5ODkxYmQyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', character: 'Iron Man' },
        { id: 3, name: 'Leonardo DiCaprio', picture: 'https://cdn.britannica.com/65/227665-050-D74A477E/American-actor-Leonardo-DiCaprio-2016.jpg?w=400&h=300&c=crop', character: '' },
    ]

    const selection: MovieActor[] = [];

    const [draggedElement, setDraggedElement] = useState<MovieActor | undefined>(undefined);

    function handleDragStart(actor: MovieActor) {
        setDraggedElement(actor);
    }

    function handleDragOver(actor: MovieActor) {
        if (!draggedElement || actor.id === draggedElement.id) return;

        const actors = [...props.actors];
        const fromIndex = actors.findIndex(ca => ca.id === draggedElement.id);
        const toIndex = actors.findIndex(ca => ca.id === actor.id);

        if (fromIndex !== -1 && toIndex !== -1) {
            [actors[fromIndex], actors[toIndex]] = [actors[toIndex], actors[fromIndex]];
            props.onAdd(actors);
        }
    }

    return (
        <>
            <label>Actors</label>
            <Typeahead
                onChange={(actors: Option[]) => {
                    const selectedActor = actors[0] as MovieActor;
                    if (props.actors.findIndex(currentActor => currentActor.id === selectedActor.id) === -1) {
                        selectedActor.character = '';
                        props.onAdd([...props.actors, selectedActor]);
                    }

                }}


                options={actors}
                filterBy={['name']}
                labelKey={(option: Option) => {
                    const actor = option as MovieActor;
                    return actor.name;
                }}
                placeholder="Write the name of actor"
                minLength={2}
                selected={selection}
                flip={true}
                renderMenuItemChildren={(option: Option) => {
                    const actor = option as MovieActor;
                    return (
                        <>
                            <img alt="actor's image" src={actor.picture}
                                style={{ height: '64px', width: '64px', marginRight: '10px' }}
                            />
                            <span>{actor.name}</span>
                        </>
                    )
                }}
            />

            <ul className="list-group">
                {props.actors.map(actor => <li
                    key={actor.id}
                    draggable={true}
                    onDragStart={() => handleDragStart(actor)}
                    onDragOver={() => handleDragOver(actor)}
                    className="list-group-item d-flex align-items-center">
                    <div style={{ width: '70px' }}>
                        <img alt="picture" style={{ height: '60px' }} src={actor.picture} />
                    </div>
                    <div style={{ marginLeft: '1rem', width: '150px' }}>
                        {actor.name}
                    </div>
                    <div className="flex-grow-1 mx-3">
                        <input className="form-control"
                            type="text"
                            placeholder="Character"
                            value={actor.character}
                            onChange={e => props.onCharacterChange(actor.id, e.currentTarget.value)}
                        />
                    </div>
                    <span
                        role="button"
                        className="badge text-bg-secondary"
                        onClick={() => props.onRemove(actor)}
                    >
                        X
                    </span>
                </li>)}
            </ul>


        </>
    )
}

interface TypeAheadActorsProps {
    actors: MovieActor[];
    onAdd(actors: MovieActor[]): void;
    onRemove(actors: MovieActor): void;
    onCharacterChange(id: number, character: string): void;
}
