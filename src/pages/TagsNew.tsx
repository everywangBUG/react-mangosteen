export const TagsNew: React.FC = () => {
  const onSubmit = () => { /* ... */ }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div flex flex-col>
          <span>标签名</span>
          <input j-input-text placeholder="2到4个汉字"/>
          <span text-red>标签名称太长</span>
        </div>
        <div>
          <span>符号</span>
          <div>表情</div>
        </div>
        <p>记账的时候长按即可，可以编辑</p>
        <div text-center>
          <button type="submit" w="90%" j-btn>新建标签</button>
        </div>
      </form>
    </div>
  )
}
