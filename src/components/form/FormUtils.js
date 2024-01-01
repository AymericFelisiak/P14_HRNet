import StateList from '../../data/StateList.json';

/**
 * Returns the abbrevation of a given state.
 * Searches through StateList.json.
 */

export function getAbbreviation(stateName) {
    const abbreviation = StateList.filter((state) => state.name === stateName)[0].abbreviation;
    return abbreviation;
}