import './index.css'

const SkillItemCard = props => {
  const {eachSkill} = props
  const data = {imgUrl: eachSkill.image_url, name: eachSkill.name}

  return (
    <li className="eachSkillCont">
      <img className="skillLogo" src={data.imgUrl} alt={data.name} />
      <p className="skillName">{data.name}</p>
    </li>
  )
}

export default SkillItemCard
