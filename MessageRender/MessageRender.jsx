import Spoiler from '../SpoilerText/SpoilerText'
import Quote from '../Quote/Quote'
import './MessageRender.css'

function MessageRender ({ data }) {
    const text = data.text
    const entities = data.entities ?? [];
    const result = [];
    let cursor = 0

    const sortedEntities = [...entities].sort((a, b) => a.offset - b.offset)

    for ( const entity of sortedEntities) 
    {
        const start = entity.offset
        const end = start + entity.length

        if (
            start < cursor ||
            start < 0 ||
            entity.length <= 0 ||
            end > text.length
        ) {
            continue
        }

        if (start > cursor) {
            result.push(text.slice(cursor, start))
        }

        const value = text.slice(start, end)

        switch (entity.type) {
            case "bold":
                result.push(
                    <strong key={`entity-${start}`}>{ value }</strong>
                )
                break

            case "italic":
                result.push(
                    <em key={`entity-${start}`}>{value}</em>
                )
                break

            case "spoiler":
                result.push(
                    <Spoiler key={`entity-${start}`} text={value}/>
                )

                break

            case "mono":
                result.push(
                    <span key={`entity-${start}`} onClick={() => {navigator.clipboard.writeText(value)}} className='CopyText'>{value}</span>
                )
                break

            case "quote":
                result.push(
                    <Quote key={`entity-${start}`} text={value}/>
                )
                break

            case "underline":
                result.push(
                    <u key={`entity-${start}`}>{value}</u>
                )
                break

            case "strikethrough":
                result.push(
                    <s>{value}</s>
                )
                break

            default:
                result.push(
                    <span key={`entity-${start}`}>{value}</span>
                )
        }

        cursor = end;

    }

    if (cursor < text.length) {
        result.push(text.slice(cursor))
    }

    return (
        <div className="MessageRender">
            {result}
        </div>

    )
}

export default MessageRender