const firstname:string = "James"

const isCoolName = (name: string) => {
  return name.startsWith("J")
}

if(isCoolName(firstname)) {
  console.log("That's a cool name")
} else {
  console.log("Blame your parents")
}
