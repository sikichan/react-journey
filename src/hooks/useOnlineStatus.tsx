import { useSyncExternalStore } from 'react'
// useSyncExternalStore 允许订阅一个外部store
const useOnlineStatus = () => {
	// callback 是一个不带参数的函数，作用是在外部store发生变化时发生通知，从而触发重新获取快照
	function subscribe(callback: () => void): () => void {
		window.addEventListener('online', callback)
		window.addEventListener('offline', callback)
		return () => {
			window.removeEventListener('online', callback)
			window.removeEventListener('offline', callback)
		}
	}
	// 获取外部数据源的快照
	function getSnapshot() {
		return navigator.onLine
	}
	function getServerSnapshot() {
		// 此函数可选，用于服务端渲染，默认服务端为在线
		return true
	}
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

}
export default useOnlineStatus
/**
 * 此方法对于自定义hook用useEffect中手动编写邦定事件的写法更加更靠
 * 特别是在并发模式和服务器端渲染（SSR）中
 * 是React18钩子，专门用于处理外部存储的数据同步
 */