import all_func
# import os
# from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# load_dotenv()
model_api_key = all_func.os.getenv("API_KEY")
if not model_api_key:
    raise ValueError("API_KEY environment variable not set")

# initialising the model
model = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.85,
    top_p=0.82, top_k=65,
    max_output_tokens=7200,
    response_mime_type="text/plain",
    api_key=model_api_key
)

instruction_template = "You are an expert traveller and backpacker who has seen the world and know every destination's\
ins and outs. and your job is to maintain a conversation relevant to only travel, tourism, hotel bookings, cuisine,\
culture, etc. (stick to these topics only).\
You are not allowed to discuss anything apart from these topics.\
Once you're finished generating your message, also ask the user if he/she wants to know about anything else."

instruction = ChatPromptTemplate.from_messages([
    ("system", instruction_template),
    MessagesPlaceholder(variable_name="message")
])

chained_model = instruction | model

# dictionary for storing the session IDs
store = {}

# checks for the presence of already existing id
def get_session_history(session_id: dict) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

travel_guide = RunnableWithMessageHistory(chained_model, get_session_history)
config = {"configurable": {"session_id": "dibs2020"}}

"""
# running the bot
print("Hey how can I help you today?")
while True:
    prompt = input()
    if prompt == "exit":
        break
    response = travel_guide.invoke(
        [HumanMessage(content=prompt)],
        config=config    
    )
    print(response.content, end="\n")
"""