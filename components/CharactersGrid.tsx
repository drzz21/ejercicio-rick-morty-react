import * as React from 'react';
import { useFetchCharacters } from '../hooks/characters';
import CharacterCard from '../components/CharacterCard';
import { ModalConfirm } from '../ui/ModalConfirm';
import { createPortal } from 'react-dom';

export default function CharactersGrid() {
  const {
    characters,
    changeCharacterAttribute,
    onDeleteCharacter,
    characterToDelete,
    showAlert,
    cachedDeleteCharacter,
  } = useFetchCharacters();

  const [query, setQuery] = React.useState('');

  const filteredItems = characters.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <React.Fragment>
      {createPortal(
        <ModalConfirm fun={cachedDeleteCharacter} info={characterToDelete} />,
        document.querySelector('#modal')
      )}

      {showAlert && (
        <div
          className="alert alert-success d-flex m-3 align-items-center fixed-top"
          role="alert"
        >
          <div>Correctly deleted element!</div>
        </div>
      )}

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="input-group mb-2">
            <span className="input-group-text">Search Character</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              className="form-control"
              placeholder="Character to search"
              aria-label="Character"
            />
          </div>
        </div>
        <div className="row">
          {filteredItems.map((character) => (
            <div key={character.id} className="col-md-3 col-xl-2 col-sm-4 mb-3">
              <CharacterCard
                character={character}
                onChangeCharacterAttribute={changeCharacterAttribute}
                onDeleteCharacter={onDeleteCharacter}
              />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
