import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
        gender
        created
        episode{
            id
            air_date
            episode
        }
      }
    }
  }
`;
export default function CharacterList() {
  const { error, loading, data } = useQuery(GET_CHARACTERS);
  console.log({ error, loading, data });

  if (loading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>Something is wrong</div>;
  }

  return (
    <div className="list">
      {data.characters.results.map((character) => (
        <div>
        <img src={character.image} alt="" />
         <h2>{character.name}</h2>
         <h2>{character.gender}</h2>
         <h2>{character.created}</h2>
         <ul>
         {character.episode.map((ep)=>{
             return <li>{ep.air_date}</li>
             
         })}
         </ul>
         <ul>
         {character.episode.map((ep)=>{
           return <li>{ep.episode}</li>
         })}
         </ul>
        </div>
      ))}
    </div>
  );
}
