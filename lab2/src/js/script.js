const movieInfo = {
    citizenkane: {
        title: 'Citizen Kane',
        director: 'Orson Welles',
        cast: ['Orson Welles', 'Joseph Cotten', 'Dorothy Comingore'],
        runtime: '1h 59min',
        awards: [
            '1942 Oscars Winner: Best Writing',
            '1942 Oscars Winner: Original Screenplay',
        ],
        plot: `A group of reporters are trying to decipher the last word ever spoken by Charles Foster Kane, the millionaire newspaper tycoon: "Rosebud". The film begins with a news reel detailing Kane's life for the masses, and then from there, we are shown flashbacks from Kane's life. As the reporters investigate further, the viewers see a display of a fascinating man's rise to fame, and how he eventually fell off the top of the world.`,
    },
    charliechocolatefactory: {
        title: 'Charlie and the Chocolate Factory',
        director: 'Tim Burton',
        cast: ['Johnny Depp', 'Freddie Highmore', 'David Kelly'],
        runtime: '1h 55min',
        awards: ['2006 Oscars Nominee: Best Achievement in Costume Design'],
        plot: `When Willy Wonka decides to let five children into his chocolate factory, he decides to release five golden tickets in five separate chocolate bars, causing complete mayhem. The tickets start to be found, with the fifth going to a very special boy, called Charlie Bucket. With his Grandpa, Charlie joins the rest of the children to experience the most amazing factory ever. But not everything goes to plan within the factory.`,
    },
    iceage: {
        title: 'Ice Age',
        director: 'Chris Wedge and Carlos Saldanha',
        cast: ['Denis Leary', 'John Leguizamo', 'Ray Romano'],
        runtime: '1h 21min',
        awards: ['2003 Oscar Nominee: Best Animated Feature'],
        plot:
            'Back when the Earth was being overrun by glaciers, and animals were scurrying to save themselves from the upcoming Ice Age, a sloth named Sid, a woolly mammoth named Manny, and a saber-toothed tiger named Diego are forced to become unlikely heroes. The three reluctantly come together when they have to return a human child to its father while braving the deadly elements of the impending Ice Age.',
    },
    snakesonaplane: {
        title: 'Snakes on a Plane',
        director: 'David R. Ellis',
        cast: ['Samuel L. Jackson', 'Julianna Marguiles', 'Nathan Philips'],
        runtime: '1h 45min',
        awards: ['2007 Saturn Award Nominee: Best Horror Film'],
        plot: `While practicing motocross in Hawaii, Sean Jones witnesses the brutal murder of an important American prosecutor by the powerful mobster Eddie Kim. FBI agent Neville Flynn persuades him to testify against Eddie in Los Angeles. They board the red-eye Flight 121 of Pacific Air, occupying the entire first-class section. However, Eddie dispatches hundred of different species of snakes airborne with a time-operated device in the luggage to release the snakes into the flight with the intent of crashing the plane. Neville and the passengers must struggle with the snakes to survive.`,
    },
    apollo13: {
        title: 'Apollo 13',
        director: 'Ron Howard',
        cast: ['Tom Hanks', 'Bill Paxton', 'Kevin Bacon'],
        runtime: '2h 20min',
        awards: [
            '1996 Oscar Winner: Best Sound',
            '1996 Oscar Winner: Best Film Editing',
        ],
        plot: `Based on the true story of the ill-fated 13th Apollo mission bound for the moon. Astronauts Lovell, Haise and Swigert were scheduled to fly Apollo 14, but are moved up to 13. It's 1970, and The US has already achieved their lunar landing goal, so there's little interest in this "routine" flight.. until that is, things go very wrong, and prospects of a safe return fade.`,
    },
    theshining: {
        title: 'The Shining',
        director: 'Stanley Kubrick',
        cast: ['Jack Nicholson', 'Shelley Duvall', 'Danny Lloyd'],
        runtime: '2h 26min',
        awards: [
            '1981 Saturn Award Winner: Best Supporting Actor',
            '1981 Saturn Award Nominee: Best Horror Film',
        ],
        plot: `Haunted by a persistent writer's block, the aspiring author and recovering alcoholic, Jack Torrance, drags his wife, Wendy, and his gifted son, Danny, up snow-capped Colorado's secluded Overlook Hotel after taking up a job as an off-season caretaker. As the cavernous hotel shuts down for the season, the manager gives Jack a grand tour, and the facility's chef, the ageing Mr Hallorann, has a fascinating chat with Danny about a rare psychic gift called "The Shining", making sure to warn him about the hotel's abandoned rooms, and, in particular, the off-limits Room 237. However, instead of overcoming the dismal creative rut, little by little, Jack starts losing his mind, trapped in an unforgiving environment of seemingly endless snowstorms, and a gargantuan silent prison riddled with strange occurrences and eerie visions. Now, the incessant voices inside Jack's head demand sacrifice. Is Jack capable of murder?`,
    },
    backtothefuture: {
        title: 'Back to the Future',
        director: 'Robert Zemickis',
        cast: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson'],
        runtime: '1h 56min',
        awards: [
            '1986 Oscar Winner: Best Effects',
            '1986 Oscar Winner: Sound EFfects Editing',
        ],
        plot: `Marty McFly, a typical American teenager of the Eighties, is accidentally sent back to 1955 in a plutonium-powered DeLorean "time machine" invented by a slightly mad scientist. During his often hysterical, always amazing trip back in time, Marty must make certain his teenage parents-to-be meet and fall in love - so he can get back to the future.`,
    },
    darkknight: {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
        runtime: '2h 32min',
        awards: [
            '2009 Oscar Winner: Best Performance by an Actor in a Supporting Role',
            '2009 Oscar Winner: Best Achievement in Sound Editing',
        ],
        plot: `Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as "The Joker" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to "confront everything he believes" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.`,
    },
    meninblack: {
        title: 'Men in Black',
        director: 'Barry Sonnenfeld',
        cast: ['Tommy Lee Jones', 'Will Smith', 'Linda Fiorentino'],
        runtime: '1h 38min',
        awards: ['1998 Oscar Winner: Best Makeup'],
        plot: `Based off of the comic book. Unbeknownst to other people, there is a private agency code named MiB. This agency is some kind of extra terrestrial surveillance corporation. Then, one of the agency's finest men only going by the name "K" (Tommy Lee Jones) , is recruiting for a new addition to the agency. He has chosen James Edwards (Will Smith) of the N.Y.P.D. Then, one day, a flying saucer crashes into Earth. This was an alien a part of the "Bug" race. He takes the body of a farmer (Vincent D'Onofrio) and heads to New York. He is searching for a super energy source called "The Galaxy". Now, Agents J and K must stop the bug before it can escape with the galaxy.`,
    },
    terminator: {
        title: 'The Terminator',
        director: 'James Cameron',
        cast: ['Arnold Schwarzenegger', 'Linda Hamilton', 'Michael Biehn'],
        runtime: '1h 47min',
        awards: [
            '1985 Saturn Award Winner: Best Science Fiction Film',
            '1985 Saturn Award Winner: Best Writing',
            '1985 Saturn Award Winner: Best Make-Up',
        ],
        plot: `Sent back from a dystopian 2029--where the cold machines have conquered the entire world--to 1984 Los Angeles, the indestructible cyborg-assassin known as the "Terminator" commences his deadly mission to kill humankind's most important woman: the unsuspecting, Sarah Connor. However, from the same war-torn post-apocalyptic future comes a battle-scarred defender--Kyle Reese, a brave soldier of the human Resistance Army--bent on stopping the cybernetic killer from eliminating the world's last hope. But, the Terminator has no feelings, he doesn't sleep, and above all, he won't stop until he carries out his grim task. Does our future lie in our past?`,
    },
};

$('#detailModal').on('show.bs.modal', (event) => {
    var button = $(event.relatedTarget);
    var recip = button.data('title');
    var modal = $('#detailModal');
    modal.find('.modal-title').text(movieInfo[recip].title);
    modal.find('.modal-body .plot').text(movieInfo[recip].plot);
    modal.find('.modal-body .runtime').text(movieInfo[recip].runtime);
    modal
        .find('.modal-body .cast')
        .html(
            movieInfo[recip].cast
                .map((elem) => `<li>${elem}</li>`)
                .reduce((prev, curr) => `${prev}${curr}`)
        );
    modal
        .find('.modal-body .awards')
        .html(
            movieInfo[recip].awards
                .map((elem) => `<li>${elem}</li>`)
                .reduce((prev, curr) => `${prev}${curr}`)
        );
});
