
class ListNode:
    def __init__(self, x=None):
         self.val = x
         self.next = None


def hasCycle(head: ListNode) -> bool:
    ''' Return True if linked list has a cycle and false otherwise'''
    
    #Base case : If linked list has <= 1 element, no cycle
    if head is None or head.next is None:
        return False

    #Position slow and fast pointers at the start and start+1 position
    slow_pointer = head
    fast_pointer = head.next

    #Traverse linked list while fast_pointer is not at the end of the linked list
    while(fast_pointer is not None):
        #If pointers meet, return True
        if slow_pointer == fast_pointer:
            return True
        #else if the fast pointer is one step before the end of the linked list, return False
        elif fast_pointer.next is None:
            return False
        #otherwise move the fast_pointer ahead by 2 steps and the slow_pointer by one
        else:
            slow_pointer = slow_pointer.next
            fast_pointer = fast_pointer.next.next

    #If the fast_pointer has reached the end of the linked list, return False
    return False







