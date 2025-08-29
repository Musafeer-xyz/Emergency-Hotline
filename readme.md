1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?
2. How do we **create and insert a new element into the DOM**?
3. What is **Event Bubbling** and how does it work?
4. What is **Event Delegation** in JavaScript? Why is it useful?
5. What is the difference between **preventDefault() and stopPropagation()** methods?

1. 
Basically, they're all ways to grab stuff from wer HTML.

getElementById: we use this when we need one specific thing and we know its unique ID. It's super direct.

getElementsByClassName: This gets us a whole group of things that all share the same class name.

querySelector: This is the flexible one. We use a CSS selector (like .my-class or #my-id) and it grabs the first thing it finds that matches.

querySelectorAll: Same as querySelector, but it grabs all the things that match, not just the first one.

2. 
It's a two-step process: we make it, then we place it.

Make it: First, we create an element in our script with document.createElement('div'). At this point, it's just in we code, not on the page.

Place it: We grab an existing element from the page (like a container) and use .appendChild() to stick wer new element inside it. That's when it finally shows up on the website.

3. What is Event Bubbling?
When we do something, like click a button, the event doesn't just stop there. It "bubbles up" to its parent element, then to the parent's parent, and keeps going up. So, if we click a button inside a div, the button's click event happens first, and then the div's click event happens right after.

4. What is Event Delegation?
This is a smart trick that uses event bubbling. Instead of putting a click listener on 100 different items, we just put one single listener on the parent container that holds them all.

When we click an item, the event bubbles up to the parent, and the listener catches it. It's way more efficient and even works for new items we add later.

5. preventDefault() vs. stopPropagation()?
They both stop something, but they stop different things.

preventDefault(): This stops the browser's default action. For example, it stops a link from opening a new page, or it stops a form from reloading the page when we hit submit.

stopPropagation(): This stops event bubbling. If we click on an element and use this, the event stops right there and won't travel up to its parent. The parent element will never even know the click happened.









