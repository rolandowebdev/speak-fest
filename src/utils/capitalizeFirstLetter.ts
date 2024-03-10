export const capitalizeFirstLetter = (name: string): string => {
	return name?.[0]?.toUpperCase() + name?.slice(1) || ''
}
