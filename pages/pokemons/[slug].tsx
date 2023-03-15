import Head from 'next/head';
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import {useEffect, useState} from "react";
import AppView from "../../components/AppView";

export async function getServerSideProps(context) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
        .then(res => res.json())
        .then(res =>  res.results)
    console.log(data)

    if(data?.find(pokemon => pokemon.name === context.params.slug)){
        const pokemonUrl = data.find(pokemon => pokemon.name === context.params.slug).url;
        console.log(pokemonUrl)
        const pokemon = await fetch(pokemonUrl).then(res => res.json())
        console.log(pokemon)
        return {
            props: {
                pokemon
            }
        }
    }
    else {
        return {
            notFound: true
        }
    }
}


const PokePage = (props) => {

    console.log(props.pokemon)

    const abilities = props.pokemon.abilities.map((el:{},index:number) => {
        return(
            // @ts-ignore
            el.ability.name
        )
    })
    console.log(abilities)
    return(
        <div>
            {/*<AppView title='gj'></AppView>*/}
            <AppView title={props.pokemon.name} pageType=''>
                <div className="  flex items-center justify-center">
                    <div className=" flex flex-wrap my-20 ">
                        <div className="mr-20 ml-10 py-10">
                            <    // @ts-ignore
                                img src={props.pokemon.sprites.other.dream_world.front_default} className="mx-auto"/>
                        </div>
                        <div className="text-justify">
                            <h1 className="text-justify text-gray-800 text-5xl capitalize px-auto p-10">
                                {props.pokemon.name}
                            </h1>
                            <div className="text-justify text-gray-800 text-2xl capitalize px-auto p-10">
                                <p>Weight: { props.pokemon.weight}</p>
                                <p>Height: {props.pokemon.height}</p>
                                <p>Type: {props.pokemon.types[0].type.name}</p>
                                <p>Abilities: {abilities + " "}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppView>
        </div>
    )}

export default PokePage;