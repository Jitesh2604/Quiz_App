import * as Icons from '../components/Icons';

const iconMap = {
    science:    { component: Icons.BeakerIcon, color: 'text-cyan-400' },
    history:    { component: Icons.BookOpenIcon, color: 'text-green-400' },
    technology: { component: Icons.CpuChipIcon, color: 'text-purple-400' },
    computer:   { component: Icons.CpuChipIcon, color: 'text-purple-400' },
    geography:  { component: Icons.GlobeIcon, color: 'text-blue-400' },
    movies:     { component: Icons.FilmIcon, color: 'text-red-400' },
    film:       { component: Icons.FilmIcon, color: 'text-red-400' },
    music:      { component: Icons.MusicNoteIcon, color: 'text-pink-400' },
    sports:     { component: Icons.TrophyIcon, color: 'text-yellow-400' },
    art:        { component: Icons.PaintBrushIcon, color: 'text-orange-400' },
    animals:    { component: Icons.PawIcon, color: 'text-lime-400' },
    nature:     { component: Icons.PawIcon, color: 'text-lime-400' },
    food:       { component: Icons.FoodIcon, color: 'text-amber-400' },
    knowledge:  { component: Icons.BrainIcon, color: 'text-indigo-400' },
};

/**
 * Gets the appropriate icon component and color for a given category name.
 * @param {string} categoryName - The name of the category from the API.
 * @returns {{Icon: React.Component, color: string}} - The icon component and its Tailwind CSS color class.
 */
export const getCategoryIcon = (categoryName) => {
    if (!categoryName) {
        return { Icon: Icons.QuestionMarkIcon, color: 'text-gray-400' };
    }

    const lowerCaseName = categoryName.toLowerCase();

    // Find a keyword in the category name that matches a key in our map
    for (const key in iconMap) {
        if (lowerCaseName.includes(key)) {
            return { Icon: iconMap[key].component, color: iconMap[key].color };
        }
    }

    return { Icon: Icons.QuestionMarkIcon, color: 'text-gray-400' };
};
